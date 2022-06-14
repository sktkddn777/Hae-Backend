import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Provider = 'kakao' | 'naver';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerType: Provider;

  @Column()
  providerId!: string;

  @Column()
  providerData: string;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    default: 1,
  })
  status: number;

  @Column({
    nullable: true,
  })
  location: string;

  // Post와 관계 설정 필요
}
