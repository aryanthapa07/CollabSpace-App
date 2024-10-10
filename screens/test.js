import Bluebutton from "../buttons/Bluebutton";
import HomePage from "../shared/HomepageTexts";
const HomePage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
      <HomepageTexts />
      <div className="buttons flex justify-center gap-4">
        <Bluebutton
          text={userData?.is_admin ? "Manage Workspace" : "My Workspace"}
          onClick={workspaceNavigate}
        />
        <Bluebutton
          text={userData?.is_admin ? "Manage Users" : "My Projects"}
          onClick={userData?.is_admin ? usersNavigate : projectNavigate}
        />
      </div>
    </div>
  );
};

export default HomePage;
