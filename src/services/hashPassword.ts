import bcrypt from 'bcrypt';



const hash = (value: string):string => {
    return bcrypt.hashSync(value, 10);
};

export default hash;

