import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("authors")
class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  biography: string;

  @Column()
  nacionality: string;

  @Column()
  active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Autor;
