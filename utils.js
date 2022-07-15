const users = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const userExists = users.find(
        user => user.name === name && user.room === room)

    if (!name || !room || userExists) {
        return { error: "error" }
    }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

const removeUser = id => {
    const i = users.findIndex(user => user.id === id)
    return i !== -1 ? users.splice(i, 1)[0] : null
}

const getUser = id => {
	for (let i = 0; i < users.length; i++) {
		if (users[i].id == id) return users[i];
	}
};
const getAllUsers = room => users.filter(user => user.room === room);

module.exports = {addUser, removeUser, getUser, getAllUsers}