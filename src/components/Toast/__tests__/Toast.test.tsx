import { render, screen } from '@testing-library/react';

describe('Toast', () => {
  test('Should render Toast correctly', () => {
    render(<></>);
    expect(screen.getByTestId('Toast-component')).toBe(<></>);
  });
});
