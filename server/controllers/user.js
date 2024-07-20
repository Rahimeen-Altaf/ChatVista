import { User } from '../models/user.js';
// Create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {
    const avatar = {
        public_id: "jdshdj",
        url: "jdshdj",
    };

    User.create({
        name: "Rahimeen Altaf",
        username: "rahimeen",
        password: "rah123",
        avatar,
    });

    res.status(201).json({ message: 'User created successfully!' });
};

const login = (req, res) => {
    res.send('Login Page!');
};

export { login, newUser };