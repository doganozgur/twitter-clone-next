import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUploads from "../ImageUploads";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: fetchChangedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser,
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      fetchChangedUser();

      editModal.onClose();
    } catch (err) {
      toast.error("Something went wrong");

      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    fetchChangedUser,
    name,
    profileImage,
    username,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUploads
        label="Upload Profile Image"
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUploads
        label="Upload Cover Image"
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      title="Edit Profile"
      actionLabel="Save"
      disabled={isLoading}
      body={bodyContent}
      onSubmit={onSubmit}
      onClose={editModal.onClose}
      isOpen={editModal.isOpen}
    />
  );
};

export default EditModal;
