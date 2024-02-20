import { AllowNull, AutoIncrement, Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ freezeTableName: true, timestamps: false })
export class Finance extends Model<Finance> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Index({
    unique: false,
  })
  @AllowNull(false)
  @Column
  date: string; // YYYY-MM-DD

  @AllowNull(false)
  @Column
  name: string; // asset name. ex) Bitcoin

  @Column
  symbol: string; // ex) BTC for Bitcoin. casesensitive

  @AllowNull(false)
  @Column
  category: string; // ex) crypto

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  price: number; // usd

  @Column({ type: DataType.FLOAT })
  marketCap: number; // usd

  @Column({ type: DataType.FLOAT })
  totalVolume: number; // usd
}
