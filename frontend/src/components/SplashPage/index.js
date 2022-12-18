import { useSelector } from "react-redux";
import UserHome from "../UserHome";

function SplashPage() {
    const user = useSelector(state => state.session.user);

    return (
        <div>
            {user
                ? <UserHome />
                : <div>
                    What's good
                </div>
            }
        </div>
    )
}

export default SplashPage;
