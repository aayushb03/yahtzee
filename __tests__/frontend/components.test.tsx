import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Home from '../../src/app/page'

// Mocking services
jest.mock('../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));
