import Categories from "@/components/Categories";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/cards/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/types";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};
type Props = {
  searchParams: {
    category?: string | null;
    endcursor?: string | null;
  };
};
//searchParams provided by NEXT.js by default
const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch,
    projects: {
      node: ProjectInterface;
    }[] = data?.projectSearch?.edges || [];
  console.log(data);

  return (
    <>
      <section>
        <Categories />
      </section>
      <section>
        {projects.length === 0 ? (
          <section className="flexStart flex-col paddings">
            Categories
            <p className="no-result-text text-center">
              No projects found, Go create some first
            </p>
          </section>
        ) : (
          <section className="projects-grid">
            {projects.map(({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                id={node.id}
                avatarUrl={node.createdBy.avatarUrl}
                image={node.image}
                name={node.createdBy.name}
                title={node.title}
                userId={node.createdBy.id}
                key={node.id}
              />
            ))}
          </section>
        )}
      </section>
      <section>
        <Pagination
          startCursor={data?.projectSearch?.pageInfo?.startCursor}
          endCursor={data?.projectSearch?.pageInfo?.endCursor}
          hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
          hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
        />
      </section>
    </>
  );
};

export default Home;
