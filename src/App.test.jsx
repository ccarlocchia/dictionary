import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from './App';

expect.extend(matchers);

vi.mock('axios');

const createEntry = (definition) => ({
  partOfSpeech: 'noun',
  senses: [
    {
      definition,
      examples: ['A sample sentence.'],
      synonyms: ['sample'],
    },
  ],
});

const advanceSearchDebounce = async () => {
  await act(async () => {
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    await Promise.resolve();
  });
};

const searchFor = (word) => {
  fireEvent.change(screen.getByLabelText('Search a word'), {
    target: { value: word },
  });
};

beforeEach(() => {
  vi.useFakeTimers();
  axios.get.mockReset();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test('loads and displays definitions, examples, and synonyms', async () => {
  axios.get.mockResolvedValue({
    data: { entries: [createEntry('A test definition.')] },
  });

  render(<App />);
  searchFor(' hello ');

  expect(axios.get).not.toHaveBeenCalled();
  await advanceSearchDebounce();

  expect(axios.get).toHaveBeenCalledWith(
    'https://freedictionaryapi.com/api/v1/entries/en/hello',
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  );
  expect(screen.getByText('A test definition.')).toBeInTheDocument();
  expect(screen.getByText('A sample sentence.')).toBeInTheDocument();
  expect(screen.getByText('sample')).toBeInTheDocument();
  expect(screen.getByText('Definitions from Free Dictionary API')).toHaveAttribute(
    'href',
    'https://freedictionaryapi.com/'
  );
});

test('shows a not-found message when the API returns 404', async () => {
  axios.get.mockRejectedValue({ response: { status: 404 } });

  render(<App />);
  searchFor('unknownword');
  await advanceSearchDebounce();

  expect(screen.getByText('No definition found for "unknownword".')).toBeInTheDocument();
});

test('shows an error message when the API request fails', async () => {
  axios.get.mockRejectedValue(new Error('Network unavailable'));
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);
  searchFor('hello');
  await advanceSearchDebounce();

  expect(screen.getByText('Unable to load the definition. Please try again.')).toBeInTheDocument();
  expect(consoleError).toHaveBeenCalled();
});

test('ignores a response after its search has been superseded', async () => {
  let resolveFirstRequest;
  const firstRequest = new Promise((resolve) => {
    resolveFirstRequest = resolve;
  });

  axios.get
    .mockReturnValueOnce(firstRequest)
    .mockResolvedValueOnce({
      data: { entries: [createEntry('The newer definition.')] },
    });

  render(<App />);
  searchFor('first');
  await advanceSearchDebounce();
  const firstRequestSignal = axios.get.mock.calls[0][1].signal;

  searchFor('second');
  expect(firstRequestSignal.aborted).toBe(true);
  await advanceSearchDebounce();

  await act(async () => {
    resolveFirstRequest({
      data: { entries: [createEntry('The outdated definition.')] },
    });
    await firstRequest;
  });

  expect(screen.getByText('The newer definition.')).toBeInTheDocument();
  expect(screen.queryByText('The outdated definition.')).not.toBeInTheDocument();
});
