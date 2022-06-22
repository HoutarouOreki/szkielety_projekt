import { IdNameModel } from './id_name_model';

describe('Wojewodztwo', () => {
  it('should create an instance', () => {
    expect(new IdNameModel(2, "Lubelskie")).toBeTruthy();
  });
});
