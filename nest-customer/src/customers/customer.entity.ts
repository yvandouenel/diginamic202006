import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() //décorateur qui fait en sorte que l'orm sache que c'est une entity
export class Customer {
  @PrimaryGeneratedColumn()//décorateur pour indiquer quelle est la clé primaire
  id: number;
  @Column({length: 50})
  firstname: string;

  @Column({length: 50})
  lastname: string;

  @Column({length: 200, nullable: true})
  email: string;

  toString() {
    return `[${this.id}] ${this.firstname} ${this.lastname}`;
  }
}