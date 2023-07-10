import { HourStringPipe } from './hour-string.pipe';

describe('HourStringPipe', () => {
  it('create an instance', () => {
    const pipe = new HourStringPipe();
    expect(pipe).toBeTruthy();
  });
});
