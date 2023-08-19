import ProfilePage from "@/components/ProfilePage";
import { getProjectDetails, getUserProjects } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { UserProfile } from "@/types";

const ProjectDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const result = await getUserProjects(id, 100) as { user: UserProfile }

  return (
    <section>
      {!result?.user ? (
        <p className="no-result-text">Failed to fetch user info</p>
      ) : (
        <ProfilePage user={result?.user} />
      )}
    </section>
  );
};

export default ProjectDetails;
