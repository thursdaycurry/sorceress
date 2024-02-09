import { Transform } from 'class-transformer';

export class GetFactDto {
  // @Transform(({ value }) => value.toUpperCase())
  // @Transform(({ value }) => value.replace(/\s+/g, ``).split(',').map(Number))
  @Transform(({ value }) =>
    value
      .replace(/\s+/g, ``)
      .split(`,`)
      .map((value) => value.toUpperCase()),
  )
  readonly countryCode: string[];
}
