

function CreateGroupPage() {

    return (
        <form>
            <label>
                Name
                <input type="text" />
            </label>
            <label>
                About
                <input type="text" />
            </label>
            <label>
                Type
                <input type="text" />
            </label>
            <label>
                Private
                <input type="text" />
            </label>
            <label>
                City
                <input type="text" />
            </label>
            <label>
                State
                <input type="text" />
            </label>
            <button type="submit">Create Group</button>
        </form>
    );
};

export default CreateGroupPage;
