import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity('books') 
class Livro {
    @PrimaryGeneratedColumn()
  id: number;  // A chave primária com incremento automático

  @Column({ type: "varchar", length: 255 })
  title: string;  // Título do livro (campo varchar)

  @Column({ type: "text" })
  description: string;  // Descrição do livro (campo texto)

  @Column({ type: "date" })
  publication_date: Date;  // Data de publicação do livro (campo date)

  @Column({ type: "varchar", length: 13 })
  isbn: string;  // Código ISBN do livro (campo varchar com 13 caracteres)

  @Column({ type: "int" })
  page_count: number;  // Número de páginas (campo inteiro)

  @Column({ type: "varchar", length: 50 })
  language: string;  // Idioma do livro (campo varchar)

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;  // Data de criação (timestamp)

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;  // Data da última atualização (timestamp)
 
}

export default Livro;