import { useRef, useState, useEffect } from "react";
import Footer from "../CommonModule/FooterModule/Footer";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Styles from "./Profile.module.css";

// Icons Components
const DefaultAvatar = () => (
    <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="18" fill="#cbd5e1" />
        <ellipse cx="40" cy="68" rx="28" ry="18" fill="#cbd5e1" />
    </svg>
);

const EditIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const CameraIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
    </svg>
);

const ShareIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const InstaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const GlobeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);


const Profile = () => {
    const [socials, setSocials] = useState({ x: "", instagram: "", portfolio: "" });
    const [bio, setBio] = useState("");
    const imageFile = useRef(null);
    const [name, setName] = useState("Samuel Khanna");
    const [username, setUsername] = useState("sam96");
    const [location, setLocation] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [showTagsDropdown, setShowTagsDropdown] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const tagsSectionRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const availableTags = [
        "Developer", "Artist", "Creator", "Illustrator",
        "Designer", "Minimalist", "Photographer"
    ];
    const remainingTagSlots = 3 - selectedTags.length;

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
            if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
            return image;
        });
        e.target.value = "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSocials((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagToggle = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) return prevTags.filter((t) => t !== tag);
            if (prevTags.length >= 3) return prevTags;
            return [...prevTags, tag];
        });
    };

    const handleTagRemove = (tagToRemove) => {
        setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: name,
                text: `Check out ${name}'s profile on WallGodds`,
                url: window.location.href
            });
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!tagsSectionRef.current?.contains(event.target)) {
                setShowTagsDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div className={Styles.pageWrapper}>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>

            <div className={Styles.container}>
                <div className={Styles.profileWrapper}>

                    {/* Cover Banner */}
                    <div className={Styles.coverBanner}>
                        <button className={Styles.shareBtn} onClick={handleShare} title="Share Profile">
                            <ShareIcon />
                        </button>
                    </div>

                    <div className={Styles.mainLayout}>
                        {/* Left Column: ID Card */}
                        <div className={Styles.idCard}>
                            <div className={Styles.avatarContainer}>
                                <div className={Styles.avatarImageWrapper}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Profile" className={Styles.avatarImage} />
                                    ) : (
                                        <div className={Styles.avatarFallback}><DefaultAvatar /></div>
                                    )}
                                </div>
                                <button className={Styles.editAvatarBtn} onClick={handleImageClick}>
                                    <CameraIcon />
                                </button>
                                <input type="file" accept="image/*" ref={imageFile} onChange={handleImageFileChange} hidden />
                            </div>

                            <div className={Styles.userInfoContent}>
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
                                    <button className={Styles.editBtn} onClick={() => setIsEditingName(!isEditingName)}>
                                        <EditIcon />
                                    </button>
                                </div>

                                <div className={Styles.usernameRow}>
                                    <span className={Styles.atSymbol}>@</span>
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
                                        <span className={Styles.usernameText}>{username}</span>
                                    )}
                                    <button className={Styles.editBtnSm} onClick={() => setIsEditingUsername(!isEditingUsername)}>
                                        <EditIcon size={12} />
                                    </button>
                                </div>

                                <div className={Styles.locationRow}>
                                    <LocationIcon />
                                    <input
                                        type="text"
                                        placeholder="Add your location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className={Styles.locationInput}
                                    />
                                </div>
                            </div>

                            <div className={Styles.divider}></div>

                            <div className={Styles.bioSection}>
                                <h3 className={Styles.sectionTitleSm}>About</h3>
                                <textarea
                                    className={Styles.bioTextarea}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell the community a little about yourself..."
                                    spellCheck="false"
                                />
                            </div>
                        </div>

                        {/* Right Column: Bento Grid for robust info */}
                        <div className={Styles.bentoGrid}>

                            {/* Skills / Tags Box */}
                            <div className={`${Styles.bentoBox} ${Styles.tagsBox}`}>
                                <h3 className={Styles.bentoTitle}>Tags & Skills</h3>
                                <div className={Styles.tagsSection} ref={tagsSectionRef}>
                                    {selectedTags.map((tag) => (
                                        <span key={tag} className={Styles.tagPill}>
                                            {tag}
                                            <button className={Styles.removeTagBtn} onClick={() => handleTagRemove(tag)}>×</button>
                                        </span>
                                    ))}
                                    {selectedTags.length < 3 && (
                                        <div className={Styles.tagActionWrap}>
                                            <button className={Styles.addTagBtn} onClick={() => setShowTagsDropdown(!showTagsDropdown)}>
                                                + Add up to {remainingTagSlots} tag{remainingTagSlots !== 1 && 's'}
                                            </button>
                                            {showTagsDropdown && (
                                                <div className={Styles.tagsDropdown}>
                                                    {availableTags.map(tag => (
                                                        <label key={tag} className={Styles.tagOption}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedTags.includes(tag)}
                                                                onChange={() => handleTagToggle(tag)}
                                                                disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                                                            />
                                                            <span>{tag}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Socials Box */}
                            <div className={`${Styles.bentoBox} ${Styles.socialsBox}`}>
                                <h3 className={Styles.bentoTitle}>Social Links</h3>
                                <div className={Styles.socialsList}>
                                    <div className={Styles.socialItem}>
                                        <div className={`${Styles.socialIconWrap} ${Styles.twIcon}`}>
                                            <TwitterIcon />
                                        </div>
                                        <input
                                            type="text"
                                            name="x"
                                            value={socials.x}
                                            onChange={handleInputChange}
                                            placeholder="X (Twitter) URL"
                                            className={Styles.socialInput}
                                        />
                                    </div>
                                    <div className={Styles.socialItem}>
                                        <div className={`${Styles.socialIconWrap} ${Styles.igIcon}`}>
                                            <InstaIcon />
                                        </div>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={socials.instagram}
                                            onChange={handleInputChange}
                                            placeholder="Instagram URL"
                                            className={Styles.socialInput}
                                        />
                                    </div>
                                    <div className={Styles.socialItem}>
                                        <div className={`${Styles.socialIconWrap} ${Styles.webIcon}`}>
                                            <GlobeIcon />
                                        </div>
                                        <input
                                            type="text"
                                            name="portfolio"
                                            value={socials.portfolio}
                                            onChange={handleInputChange}
                                            placeholder="Portfolio URL"
                                            className={Styles.socialInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Badges Box (Span full width of right col) */}
                            <div className={`${Styles.bentoBox} ${Styles.badgesBox}`}>
                                <h3 className={Styles.bentoTitle}>Achievements</h3>
                                <div className={Styles.badgesList}>
                                    <div className={Styles.badgeItem} title="Early Adopter">
                                        <div className={`${Styles.badgeCircle} ${Styles.badgeBlue}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        </div>
                                        <span className={Styles.badgeLabel}>Pioneer</span>
                                    </div>
                                    <div className={Styles.badgeItem} title="Top Uploader">
                                        <div className={`${Styles.badgeCircle} ${Styles.badgePurple}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                        </div>
                                        <span className={Styles.badgeLabel}>Uploader</span>
                                    </div>
                                    <div className={Styles.badgeItem} title="Explorer">
                                        <div className={`${Styles.badgeCircle} ${Styles.badgeTeal}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                                            </svg>
                                        </div>
                                        <span className={Styles.badgeLabel}>Explorer</span>
                                    </div>
                                    <div className={`${Styles.badgeItem} ${Styles.badgeEmpty}`}>
                                        <div className={Styles.badgeCircle}>
                                            <span>?</span>
                                        </div>
                                        <span className={Styles.badgeLabel}>Locked</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={Styles.wallsWrapper}>
                        <div className={Styles.wallsHeader}>
                            <h3 className={Styles.wallsTitle}>Your Walls</h3>
                        </div>
                        <div className={Styles.wallsEmptyState}>
                            <div className={Styles.emptyIcon}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                            <p className={Styles.emptyTitle}>Your gallery is empty</p>
                            <p className={Styles.emptySubtitle}>Upload your favorite wallpapers and start inspiring others.</p>
                            <button className={Styles.uploadBtn}>Upload First Wall</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className={Styles.footerWrapper}>
                <Footer />
            </div>
        </div>
    );
};

export default Profile;
