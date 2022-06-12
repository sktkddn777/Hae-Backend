import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  provider_id: string;

  @Column()
  provider_data: string;

  @Column()
  nickname: string;

  @Column()
  location: string;

  // Post와 관계 설정 필요
}
