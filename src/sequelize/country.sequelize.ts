import {
  AutoIncrement,
  Column,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// TODO: 데이터 추가할 것
@Table({ freezeTableName: true, timestamps: false })
export class Country extends Model<Country> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;
  /**
   * ISO 3166-1 alpha2, two-letter country code
   * https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */

  @Index({
    unique: true,
  })
  @Column
  code: string;

  // ISO alpha-3
  @Column
  alpha3: string;

  @Column
  country_numb_code: number;

  @Column
  region: string;

  @Column
  sub_region: string;

  @Column
  intermediate_region: string;

  @Column
  region_code: string;

  @Column
  sub_region_code: string;

  @Column
  intermediate_region_code: string;
}
