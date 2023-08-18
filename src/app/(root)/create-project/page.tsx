import ProjectForm from "@/components/forms/ProjectForm";
import Model from "@/components/models/Model";
import { getCurrentUser } from "@/lib/session";

const CreatePage = async () => {
  const CurrentUser = await getCurrentUser();
  return (
    <Model>
      <h3 className="modal-head-text">Create a new Project</h3>
      <ProjectForm session={CurrentUser} type={"create"} />
    </Model>
  );
};

export default CreatePage;
