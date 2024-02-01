import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// TODO: 데이터 추가할 것
@Table({ timestamps: false })
// { freezeTableName: true }
export class Country extends Model<Country> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;
  // ISO 3166-1 alpha2, two-letter country code
  // https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
  @Column
  codes: string;

  @Column
  capital: string;

  @Column
  region: string;

  @Column
  timezone: string;
}
