

function CreateGroupPage() {

    return (
        <form>
            <label>
                Location
                <input type="text" />
            </label>
            <label>
                Interests
                <input type="text" />
            </label>
            <label>
                Group Name
                <input type="text" />
            </label>
            <label>
                About
                <input type="text" />
            </label>
            <button type="submit">Create Group</button>
        </form>
    );
};

export default CreateGroupPage;
