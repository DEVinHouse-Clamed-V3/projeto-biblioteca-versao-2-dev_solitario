import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("readers")
export default class Leitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"name"})
  nome: string;

  @Column()
  email: string;

  @Column({name: "phone_number"})
  telefone: string;

  @Column({name:"birthdate"})
  dataNascimento: Date;

  @Column({name:"address", type: 'text'})
  endereco: string;

  @Column({name:"active"})
  ativo: boolean;

  @Column({name:"created_at"})
  criadoEm: Date;

  @Column({name:"updated_at"})
  atualizadoEm: Date;
}
