import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../CommonModule/FooterModule/Footer";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Styles from "./Profile.module.css";

// ── Helpers ────────────────────────────────────────────────────
const getInitials = (fullName) => {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");
};

// Light purple palette — deterministic from initials
const AVATAR_COLORS = [
  { bg: "#ddd6fe", text: "#5b21b6" },
  { bg: "#c7d2fe", text: "#3730a3" },
  { bg: "#e0e7ff", text: "#4338ca" },
  { bg: "#ede9fe", text: "#6d28d9" },
  { bg: "#d8b4fe", text: "#7e22ce" },
];
const getAvatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

import {
  XIcon,
  InstaIcon,
  GlobeIcon,
  PencilIcon,
  ShareIcon,
  CameraIcon,
  MapPinIcon,
  GpsIcon,
  SaveIcon,
  PlusIcon,
  UploadCircleIcon,
  ArrowRightIcon,
  WallpaperBadgeIcon,
  DownloadBadgeIcon,
  StarBadgeIcon,
  FireBadgeIcon,
  EyeBadgeIcon,
  HeartBadgeIcon,
} from "./Icons";

// ── Demo Wallpapers (from /Wallpapers/Desktop) ─────────────────
const DEMO_WALLS = [
  {
    id: 1,
    src: "/Wallpapers/Desktop/harsh_lavendersky.png",
    title: "Lavender Sky",
  },
  {
    id: 2,
    src: "/Wallpapers/Desktop/harsh_pastelvalley.png",
    title: "Pastel Valley",
  },
  { id: 3, src: "/Wallpapers/Desktop/Sudipta_serenity.jpg", title: "Serenity" },
  {
    id: 4,
    src: "/Wallpapers/Desktop/pritha_circlysunset.png",
    title: "Circly Sunset",
  },
  { id: 5, src: "/Wallpapers/Desktop/sahithya_mate.png", title: "Mate" },
];

// ── Badge Config ───────────────────────────────────────────────
const BADGE_COLOR = "#6b7cf6";
const BADGES = [
  { icon: <WallpaperBadgeIcon />, label: "First Upload", color: BADGE_COLOR },
  { icon: <DownloadBadgeIcon />, label: "100 Downloads", color: BADGE_COLOR },
  { icon: <StarBadgeIcon />, label: "Top Rated", color: BADGE_COLOR },
  { icon: <FireBadgeIcon />, label: "Hot Streak", color: BADGE_COLOR },
  { icon: <EyeBadgeIcon />, label: "1k Views", color: BADGE_COLOR },
  { icon: <HeartBadgeIcon />, label: "Loved Art", color: BADGE_COLOR },
];

// ── Main Component ─────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const [socials, setSocials] = useState({
    x: "",
    instagram: "",
    portfolio: "",
  });
  const imageFile = useRef(null);
  const [name, setName] = useState("Samuel Khanna");
  const [username, setUsername] = useState("sam96");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [saved, setSaved] = useState(false);
  const tagsSectionRef = useRef(null);

  const availableTags = [
    "Developer",
    "Artist",
    "Caz",
    "Illustrator",
    "Designer",
    "Minimalist",
    "Photographer",
  ];
  const remainingTagSlots = 3 - selectedTags.length;
  const initials = getInitials(name);
  const avatarColor = getAvatarColor(name);

  // Image
  const handleImageClick = () => imageFile.current?.click();
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }
    const image = URL.createObjectURL(file);
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return image;
    });
    e.target.value = "";
  };

  // Socials
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocials((prev) => ({ ...prev, [name]: value }));
  };

  // Tags
  const handleTagToggle = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 3) return prev;
      return [...prev, tag];
    });
  };
  const handleTagRemove = (tag) =>
    setSelectedTags((prev) => prev.filter((t) => t !== tag));

  // Share
  const handleShare = () => {
    if (navigator.share)
      navigator.share({
        title: name,
        text: `Check out ${name}'s profile on WallGodds`,
        url: window.location.href,
      });
  };

  // Save
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: persist to backend
  };

  // Current Location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "";
          const country = data.address?.country || "";
          setLocation(
            city && country ? `${city}, ${country}` : data.display_name || "",
          );
        } catch {
          setLocation("Location detected");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("Unable to retrieve your location.");
        setIsLocating(false);
      },
    );
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    const handler = (e) => {
      if (!tagsSectionRef.current?.contains(e.target))
        setShowTagsDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const socialLinks = [
    { key: "x", icon: <XIcon />, label: "Add X" },
    { key: "instagram", icon: <InstaIcon />, label: "Add Instagram" },
    { key: "portfolio", icon: <GlobeIcon />, label: "Add portfolio" },
  ];

  return (
    <>
      <NavBar />

      {/* Rounded bordered page container */}
      <div className={Styles.pageWrapper}>
        <div className={Styles.innerContainer}>
          {/* ── Profile Card ── */}
          <div className={Styles.profileCard}>
            {/* Top-right actions */}
            <div className={Styles.cardActions}>
              <button
                className={Styles.ghostRoundBtn}
                onClick={handleShare}
                title="Share profile"
              >
                <ShareIcon />
              </button>
              <button
                className={`${Styles.saveBtn} ${saved ? Styles.saveBtnSuccess : ""}`}
                onClick={handleSave}
              >
                <SaveIcon />
                <span>{saved ? "Saved!" : "Save"}</span>
              </button>
            </div>

            <div className={Styles.cardGrid}>
              {/* ── LEFT COLUMN ── */}
              <div className={Styles.leftCol}>
                {/* Avatar */}
                <div className={Styles.avatarWrapper}>
                  <div
                    className={Styles.avatarBox}
                    onClick={handleImageClick}
                    style={!imagePreview ? { background: avatarColor.bg } : {}}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className={Styles.avatarImg}
                      />
                    ) : (
                      <span
                        className={Styles.avatarInitials}
                        style={{ color: avatarColor.text }}
                      >
                        {initials}
                      </span>
                    )}
                    <div className={Styles.avatarOverlay}>
                      <CameraIcon />
                    </div>
                  </div>
                  <button
                    className={Styles.editPhotoBtn}
                    onClick={handleImageClick}
                    title="Change photo"
                  >
                    <CameraIcon />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageFile}
                    onChange={handleImageFileChange}
                    hidden
                  />
                </div>

                {/* Socials */}
                <div className={Styles.socialsBox}>
                  {socialLinks.map(({ key, icon, label }) => (
                    <div key={key} className={Styles.socialRow}>
                      <span className={Styles.socialIcon}>{icon}</span>
                      <input
                        type="text"
                        name={key}
                        value={socials[key]}
                        onChange={handleInputChange}
                        placeholder={label}
                        className={Styles.socialInput}
                        autoComplete="off"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className={Styles.rightCol}>
                {/* Name */}
                <div className={Styles.nameRow}>
                  {isEditingName ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      className={Styles.nameInput}
                      autoFocus
                    />
                  ) : (
                    <h1 className={Styles.profileName}>{name}</h1>
                  )}
                  <button
                    className={Styles.ghostBtn}
                    onClick={() => setIsEditingName(!isEditingName)}
                    title="Edit name"
                  >
                    <PencilIcon />
                  </button>
                </div>

                {/* Username + Tags */}
                <div className={Styles.metaRow}>
                  <div className={Styles.usernamePill}>
                    <span className={Styles.atPrefix}>@</span>
                    {isEditingUsername ? (
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => setIsEditingUsername(false)}
                        className={Styles.usernameInput}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={Styles.usernameText}
                        onClick={() => setIsEditingUsername(true)}
                      >
                        {username}
                      </span>
                    )}
                  </div>

                  {selectedTags.map((tag) => (
                    <span key={tag} className={Styles.tagPill}>
                      {tag}
                      <button
                        type="button"
                        className={Styles.removeTagBtn}
                        onClick={() => handleTagRemove(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {selectedTags.length < 3 && (
                    <div className={Styles.tagActionWrap} ref={tagsSectionRef}>
                      <button
                        type="button"
                        className={Styles.addTagBtn}
                        onClick={() => setShowTagsDropdown((p) => !p)}
                      >
                        + Add up to {remainingTagSlots} more tag
                        {remainingTagSlots !== 1 ? "s" : ""}
                      </button>
                      {showTagsDropdown && (
                        <div className={Styles.tagsDropdown}>
                          <p className={Styles.dropdownLabel}>Choose Tags</p>
                          <div className={Styles.dropdownList}>
                            {availableTags.map((tag) => (
                              <label key={tag} className={Styles.tagOption}>
                                <input
                                  type="checkbox"
                                  checked={selectedTags.includes(tag)}
                                  onChange={() => handleTagToggle(tag)}
                                  disabled={
                                    !selectedTags.includes(tag) &&
                                    selectedTags.length >= 3
                                  }
                                />
                                <span>{tag}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className={Styles.locationPill}>
                  <span className={Styles.locationIcon}>
                    <MapPinIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Add your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={Styles.locationInput}
                  />
                  <button
                    className={`${Styles.gpsBtn} ${isLocating ? Styles.gpsBtnActive : ""}`}
                    onClick={handleUseCurrentLocation}
                    title="Use current location"
                    disabled={isLocating}
                  >
                    <GpsIcon />
                    <span>{isLocating ? "Locating…" : "Use current"}</span>
                  </button>
                </div>

                {/* Bio */}
                <div className={Styles.bioBox}>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Add your bio here..."
                    className={Styles.bioTextarea}
                    spellCheck="false"
                    rows={3}
                  />
                </div>

                {/* Badges */}
                <div className={Styles.badgesSection}>
                  <h3 className={Styles.badgesTitle}>Your Badges</h3>
                  <div className={Styles.badgesList}>
                    {BADGES.map((b, i) => (
                      <div key={i} className={Styles.badgeItem}>
                        <div
                          className={Styles.badgeCircle}
                          style={{ "--badge-color": b.color }}
                          title={b.label}
                        >
                          {b.icon}
                        </div>
                        <span className={Styles.badgeLabel}>{b.label}</span>
                      </div>
                    ))}
                    <div className={Styles.badgeItem}>
                      <div
                        className={Styles.badgeCircleDashed}
                        title="Earn more badges"
                      >
                        <PlusIcon />
                      </div>
                      <span className={Styles.badgeLabel}>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Your Walls ── */}
          <div className={Styles.wallsSection}>
            <div className={Styles.wallsHeader}>
              <div className={Styles.wallsTitleGroup}>
                <h2 className={Styles.wallsTitle}>Your Walls</h2>
                <span className={Styles.wallsBadge}>
                  {DEMO_WALLS.length} TOTAL
                </span>
              </div>
              <button className={Styles.viewAllBtn}>
                View All <ArrowRightIcon />
              </button>
            </div>

            <div className={Styles.wallsGrid}>
              {/* Upload card */}
              <button
                className={Styles.uploadCard}
                onClick={() => navigate("/upload")}
                title="Upload new wallpaper"
              >
                <UploadCircleIcon />
                <span className={Styles.uploadCardLabel}>
                  Upload New Wallpaper
                </span>
              </button>

              {/* Demo wallpapers */}
              {DEMO_WALLS.map((w) => (
                <div key={w.id} className={Styles.wallCard}>
                  <img
                    src={w.src}
                    alt={w.title}
                    className={Styles.wallCardImg}
                    loading="lazy"
                  />
                  <div className={Styles.wallCardOverlay}>
                    <span className={Styles.wallCardTitle}>{w.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={Styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;
