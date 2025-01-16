import withAuth from "../utils/withAuth";

function HomeComponent() {
    return (
        <h1>Home Component</h1>
    )
}

export default withAuth(HomeComponent);