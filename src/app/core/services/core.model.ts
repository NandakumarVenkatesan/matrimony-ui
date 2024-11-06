export class Profiles {
  id: number;
  name: string;
  age: string;
  height: string;
  language: string;
  caste: string;
  work: string;
  location: string;
  state: string;
  nationality: string;
  image: string;

  constructor(id: number,
              name: string,
              age: string,
              height: string,
              language: string,
              caste: string,
              work: string,
              location: string,
              state: string,
              nationality: string,
              image: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.height = height;
    this.language = language;
    this.caste = caste;
    this.work = work;
    this.location = location;
    this.state = state;
    this.nationality = nationality;
    this.image = image;
  }
}
