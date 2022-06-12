import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  // User와 관계 설정 필요
}
