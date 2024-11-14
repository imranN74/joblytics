import { ProfileIcon } from "../components/Profile";
import { TextTag } from "../components/user/TextTag";

export const Profile = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="">
          <ProfileIcon />
        </div>
        <div>
          <TextTag size="text-4xl font-semibold" value="Dekhra Binod" />
        </div>
        <div>
          <TextTag value="Software Engineer" />
        </div>
        <div>
          <TextTag value="Dekhra Binod" />
        </div>
      </div>
    </div>
  );
};
