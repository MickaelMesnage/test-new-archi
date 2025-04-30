export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: {
    name: string;
    description?: string;
    price: number;
  }): ProductEntity {
    return new ProductEntity(
      crypto.randomUUID(),
      props.name,
      props.description || null,
      props.price,
      new Date(),
      new Date()
    );
  }

  isValid(): boolean {
    return (
      this.name.length > 0 &&
      this.price >= 0 &&
      (!this.description || this.description.length > 0)
    );
  }
}
