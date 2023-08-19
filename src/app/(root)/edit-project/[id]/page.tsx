import ProjectForm from "@/components/forms/ProjectForm";
import Model from "@/components/models/Model";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { ProjectInterface } from "@/types";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser(),
    result = (await getProjectDetails(id)) as { project?: ProjectInterface };

  !session?.user && redirect("/");

  return (
    <section>
      {!result?.project ? (
        <p className="no-result-text">Failed to fetch project info</p>
      ) : (
        <Model>
          <h3 className="modal-head-text">Edit Project</h3>
          <ProjectForm
            type="edit"
            session={session}
            project={result?.project}
          />
        </Model>
      )}
    </section>
  );
};

export default EditProject;
