import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Provider = 'naver' | 'kakao';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId!: string;

  @Column()
  providerData: string;

  @Column()
  nickname: string;

  @Column()
  location: string;

  // Post와 관계 설정 필요
}
