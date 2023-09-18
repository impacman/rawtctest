import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateAge } from "../../../config/calculateAge";
import styled from "./RawPhoto.module.scss";

const Users = ({ active = false }) => {
  const userId = "60238939642";
  const token = "916f94f2-31ae-46e4-9101-49f9593dbfd0";
  const time = 10000;
  const [profiles, setProfiles] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState({
    id: "raw",
    primary: "https://www.raw.app/images/shorts/desktop/jpg/short-6-big.jpg",
    secondary: "https://www.raw.app/images/shorts/desktop/jpg/short-6-min.jpg",
    name: "Raw",
    age: 23,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.raw.app/users/${userId}/raw/search/techcrunch`, {
        headers: {
          Authorization: `Token token="${token}"`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const profileData = await response.json();
      setProfiles(profileData.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const loadRawPhotos = async (profile) => {
    try {
      const primaryResponse = await fetch(`https://rawapp.sdvcloud.net/users/${profile.userId}/photos/raw/partitions/${profile.latestRawPhoto.primary.reference}`);
      const secondaryResponse = await fetch(`https://rawapp.sdvcloud.net/users/${profile.userId}/photos/raw/partitions/${profile.latestRawPhoto.secondary.reference}`);

      if (primaryResponse.ok && secondaryResponse.ok) {
        const primaryBlob = await primaryResponse.blob();
        const secondaryBlob = await secondaryResponse.blob();

        setCurrentPhotos({
          id: profile.userId,
          primary: URL.createObjectURL(primaryBlob),
          secondary: URL.createObjectURL(secondaryBlob),
          name: profile.name,
          age: calculateAge(profile.birthday),
        });
      }
    } catch (error) {
      console.error("Error loading RAW photos:", error);
    }
  };

  useEffect(() => {
    if (!active) return;

    fetchData();

    const intervalId = setInterval(fetchData, time);
    return () => clearInterval(intervalId);
  }, [active]);

  useEffect(() => {
    if (!profiles) return;

    loadRawPhotos(profiles);
  }, [profiles]);

  return (
    <div className={styled.User}>
      <AnimatePresence>
        <motion.div key={currentPhotos.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className={styled.UserItem}>
          <div className={styled.Name}>
            {currentPhotos.name ? <span>{currentPhotos.name},&nbsp;</span> : <span>&nbsp; &nbsp;</span>}
            {currentPhotos.age ? <span>{currentPhotos.age}</span> : <span>&nbsp; &nbsp;</span>}
          </div>
          <div className={styled.WrapPhoto}>
            <div className={`${styled.Photo} ${styled.Big}`}>{currentPhotos.primary && <img src={currentPhotos.primary} alt="User Primary Photo" />}</div>
            <div className={`${styled.Photo} ${styled.Min}`}>{currentPhotos.secondary && <img src={currentPhotos.secondary} alt="User Secondary Photo" />}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Users;
