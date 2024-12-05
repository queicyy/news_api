import bcrypt from "bcrypt";

const comparePwd = async (password, hash) => {
    const validadeUser = await bcrypt
        .compare(password, hash)
        .then((res) => res)
        .catch((err) => console.error(err.message));

    return validadeUser;
};

export default comparePwd;
