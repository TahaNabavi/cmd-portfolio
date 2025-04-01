export type User = {
  name: string;
  image: string;
  notAllowCommands: string[];
  data: any;
};

const users: User[] = [
  {
    name: "TN",
    image: "https://www.tahanabavi.ir/_next/image?url=%2Fimg.jpg&w=640&q=75",
    notAllowCommands: [],
    data:{},
  },
];

export default users;
