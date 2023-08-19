"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormState, ProjectInterface, SessionInterface } from "@/types";
import { categoryFilters } from "@/constants";
import { useRouter } from "next/navigation";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import Image from "next/image";
import FormField from "../ui/FormField";
import CustomMenu from "../CustomMenu";
import Button from "../ui/Button";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const [form, setForm] = useState<FormState>({
      title: project?.title || "",
      description: project?.description || "",
      image: project?.image || "",
      liveSiteUrl: project?.liveSiteUrl || "",
      githubUrl: project?.githubUrl || "",
      category: project?.category || "",
    }),
    [IsSubmitting, setIsSubmitting] = useState<boolean>(false),
    _router = useRouter();

  const _handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const _file = e.target.files?.[0],
        _reader = new FileReader();
      if (!_file) return;
      if (!_file.type.includes("image")) {
        return alert("please Upload an Image file");
      }
      _reader.readAsDataURL(_file);
      _reader.onload = async () => {
        const _result = _reader.result as string;
        _handleStateChange("image", _result);
      };
    },
    _handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const { token } = await fetchToken();
      try {
        if (type === "create") {
          try {
            await createNewProject(form, session?.user?.id, token).then(() =>
              _router.push("/"),
            );
          } catch (error) {
            console.log(error);
            return error;
          }
        }
        if (type === "edit") {
          try {
            await updateProject(form, project?.id as string, token);
            _router.push("/");
          } catch (error) {
            console.log(error);
            return error;
          }
        }
        setIsSubmitting(true);
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        setIsSubmitting(false);
      }
    },
    _handleStateChange = (fieldName: keyof FormState, value: string) => {
      setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

  return (
    <form onSubmit={_handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label"></label>
        <input
          type="file"
          id="Image"
          name="poster"
          accept="image/*"
          required={type === "create"}
          onChange={_handleChangeImage}
          className="form_image-input"
        />

        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => _handleStateChange("title", value)}
      />
      <hr />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => _handleStateChange("description", value)}
      />
      <hr />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => _handleStateChange("liveSiteUrl", value)}
      />
      <hr />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/adrianhajdin"
        setState={(value) => _handleStateChange("githubUrl", value)}
      />
      <hr />
      <CustomMenu
        state={form.category}
        title="Category"
        filters={categoryFilters}
        setState={(value) => _handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            IsSubmitting
              ? `${type === "create" ? "creating..." : "Editing..."} `
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={IsSubmitting ? "" : "/plus.svg"}
          submitting={IsSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
