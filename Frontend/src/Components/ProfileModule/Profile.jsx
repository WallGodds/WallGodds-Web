import { useRef, useState, useEffect } from "react";
import Footer from "../CommonModule/FooterModule/Footer";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Styles from "./Profile.module.css";

// Professional SVG Icons
const XIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const InstaIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);


const Profile = () => {
    const [socials, setSocials] = useState({
        x: "",
        instagram: "",
        portfolio: ""
    });
    const imageFile = useRef(null)
    const [name, setName] = useState("Samuel Khanna");
    const [username, setUsername] = useState("sam96");
    const [location, setLocation] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [showTagsDropdown, setShowTagsDropdown] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const tagsSectionRef = useRef(null);
    const inputRef = useRef(null);
    const usernameRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null)
    const availableTags = [
        "Developer",
        "Artist",
        "Caz",
        "Illustrator",
        "Designer",
        "Minimalst",
        "Photographer"
    ];
    const remainingTagSlots = 3 - selectedTags.length;

    // Recalculate width when fonts are fully loaded
    useEffect(() => {
        document.fonts.ready.then(() => {
            if (inputRef.current) {
                inputRef.current.style.width = "0px";
                inputRef.current.style.width = inputRef.current.scrollWidth + "px";
            }
            if (usernameRef.current) {
                usernameRef.current.style.width = "0px";
                usernameRef.current.style.width = (usernameRef.current.scrollWidth + 4) + "px";
            }
        });
    }, []);

    // Auto resize input to text width
    useEffect(() => {
        //For name
        if (inputRef.current) {
            inputRef.current.style.width = "0px";
            inputRef.current.style.width =
                inputRef.current.scrollWidth + "px";
        }

        // Add this for Username
        if (usernameRef.current) {
            usernameRef.current.style.width = "0px";
            usernameRef.current.style.width = usernameRef.current.scrollWidth + "px";
        }
    }, [name, username]);

    const handleEditClick = () => {
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleBlur = (e) => {
        setIsEditing(false);

        // Manually reset scroll position to the start for Firefox
        if (e.target) {
            e.target.scrollLeft = 0;
        }
    };

    const handleUsernameBlur = (e) => {
        setIsEditingUsername(false);
        // Manually reset scroll position for the username input
        if (e.target) {
            e.target.scrollLeft = 0;
        }
    };

    useEffect(() => {
        if (isEditingUsername && usernameRef.current) {
            usernameRef.current.focus();
            // This moves the cursor to the end of the text instead of the start
            const length = usernameRef.current.value.length;
            usernameRef.current.setSelectionRange(length, length);
        }
    }, [isEditingUsername]);

    const handleImageClick = () => {
        imageFile.current?.click()
    }
    const handleImageFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        const image = URL.createObjectURL(file)
        setImagePreview((prev) => {
            if (prev && prev.startsWith("blob:")) {
                URL.revokeObjectURL(prev);
            }
            return image;
        })

        e.target.value = "";
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSocials((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleTagToggle = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            }
            if (prevTags.length >= 3) {
                return prevTags;
            }
            return [...prevTags, tag];
        });
    };
    const handleTagRemove = (tagToRemove) => {
        setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    const handleShare = () => {
        // Share functionality
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
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>

            <div className={Styles.container}>
                {/* Main Card */}
                <div className={Styles.temp}>
                    <div className={Styles.closeBtn}>
                        <button className={Styles.shareBtn} onClick={handleShare}>
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.75 1.75H6.75C3.92157 1.75 2.50736 1.75 1.62868 2.62868C0.75 3.50736 0.75 4.92157 0.75 7.75V11.75C0.75 14.5784 0.75 15.9926 1.62868 16.8713C2.50736 17.75 3.92157 17.75 6.75 17.75H10.7884C13.6168 17.75 15.031 17.75 15.9097 16.8713C16.479 16.302 16.6794 15.5079 16.75 14.25" stroke="#3C56B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.2498 4.25V1.10355C14.2498 0.908291 14.408 0.75 14.6033 0.75C14.6971 0.75 14.787 0.787249 14.8533 0.853553L19.3962 5.39645C19.6226 5.62282 19.7498 5.92986 19.7498 6.25C19.7498 6.57014 19.6226 6.87718 19.3962 7.10355L14.8533 11.6464C14.787 11.7128 14.6971 11.75 14.6033 11.75C14.408 11.75 14.2498 11.5917 14.2498 11.3964V8.25H11.3208C7.24976 8.25 5.74976 11.75 5.74976 11.75V9.25C5.74976 6.48858 7.98833 4.25 10.7498 4.25H14.2498Z" fill="#3C56B1" stroke="#3C56B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>

                    <div className={Styles.contentGrid}>
                        {/* LEFT COLUMN */}
                        <div className={Styles.leftCol}>
                            {/* Profile Pic overlapping top */}

                            <div className={Styles.profilePic}>
                                <div className={Styles.profilePhoto}>
                                    <img src={imagePreview || '/profile.jpg'} onChange={handleImageFileChange} alt="Profile" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={imageFile}
                                        onChange={handleImageFileChange}
                                        hidden
                                    />
                                </div>
                                <button className={Styles.editPhotoBtn} onClick={handleImageClick}>
                                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.6375 5.7375V10.8375C17.6375 13.2417 17.6375 14.4437 16.8906 15.1906C16.1437 15.9375 14.9416 15.9375 12.5375 15.9375H5.73745C3.33329 15.9375 2.13121 15.9375 1.38433 15.1906C0.637451 14.4437 0.637451 13.2417 0.637451 10.8375V7.48313C0.637451 6.65007 0.637451 6.23353 0.73386 5.89295C0.975033 5.04096 1.64092 4.37508 2.49291 4.1339C2.83349 4.0375 3.25002 4.0375 4.08309 4.0375C4.39417 4.0375 4.54971 4.0375 4.69459 4.01224C5.05358 3.94966 5.38296 3.77338 5.63416 3.5094C5.73555 3.40285 5.98989 3.02133 6.16245 2.7625C6.49937 2.25712 6.66783 2.00443 6.89812 1.83061C7.03875 1.72447 7.19503 1.64083 7.36136 1.58269C7.63373 1.4875 7.93743 1.4875 8.54481 1.4875H9.98745" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.5375 9.5625C12.5375 11.4403 11.0153 12.9625 9.13755 12.9625C7.25978 12.9625 5.73755 11.4403 5.73755 9.5625C5.73755 7.68473 7.25978 6.1625 9.13755 6.1625C11.0153 6.1625 12.5375 7.68473 12.5375 9.5625Z" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.5374 2.7625H16.7874M14.6624 4.8875V0.637497" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </button>
                            </div>

                            {/* </div> */}

                            {/* Socials Box - Vertical Layout (Corrected) */}
                            <div className={Styles.socialsBox}>
                                <div className={Styles.socialRow}>
                                    <div className={Styles.iconWrapper}>
                                        <XIcon />
                                    </div>
                                    <div className={Styles.inputPill}>
                                        <input
                                            type="text"
                                            name="x"
                                            value={socials.x}
                                            onChange={handleInputChange}
                                            placeholder="Add X"
                                            className={Styles.socialInput}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className={Styles.socialRow}>
                                    <div className={Styles.iconWrapper}>
                                        <InstaIcon />
                                    </div>
                                    <div className={Styles.inputPill}>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={socials.instagram}
                                            onChange={handleInputChange}
                                            placeholder="Add Instagram"
                                            className={Styles.socialInput}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className={Styles.socialRow}>
                                    <div className={Styles.iconWrapper}>
                                        <img src="/socialLinks/ion_earth-sharp.png" />
                                    </div>
                                    <div className={Styles.inputPill}>
                                        <input
                                            type="text"
                                            name="portfolio"
                                            value={socials.portfolio}
                                            onChange={handleInputChange}
                                            placeholder="Add portfolio"
                                            className={Styles.socialInput}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className={Styles.rightCol}>
                            {/* <div className={`${Styles.wireframeBox} ${Styles.banner}`}> */}
                            <div className={Styles.profileInfo}>
                                <div className={Styles.nameSection}>
                                    <input
                                        ref={inputRef}
                                        className={Styles.nameInput}
                                        value={name}
                                        readOnly={!isEditing}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <button
                                        className={Styles.editBtn}
                                        onClick={handleEditClick}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.4018 2.0607L13.2681 1.19446C13.9857 0.476847 15.1492 0.476847 15.8668 1.19446C16.5844 1.91208 16.5844 3.07556 15.8668 3.79318L15.0006 4.65943M12.4018 2.0607L6.57491 7.8876C6.13084 8.33175 5.81581 8.88807 5.6635 9.49734L5.03003 12.0312L7.56394 11.3977C8.1732 11.2455 8.72953 10.9304 9.17368 10.4863L15.0006 4.65943M12.4018 2.0607L15.0006 4.65943" stroke="#3C56B1" strokeWidth="1.3125" strokeLinejoin="round" />
                                            <path d="M14.6562 9.84344C14.6562 12.72 14.6562 14.1582 13.8617 15.1263C13.7163 15.3035 13.5538 15.466 13.3766 15.6114C12.4086 16.4059 10.9702 16.4059 8.09366 16.4059H7.65625C4.35642 16.4059 2.70651 16.4059 1.68139 15.3808C0.656276 14.3557 0.65625 12.7057 0.65625 9.40594V8.96844C0.65625 6.0919 0.65625 4.65364 1.4507 3.68558C1.59615 3.50836 1.75866 3.34584 1.93589 3.20039C2.90394 2.40594 4.3422 2.40594 7.21875 2.40594" stroke="#3C56B1" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </button>

                                </div>

                                <div className={Styles.usernameSection}>
                                    <div className={Styles.usernameContainer}>
                                        <button className={Styles.userEditBtn} onClick={() => setIsEditingUsername(!isEditingUsername)}>

                                            <svg width="14" height="14" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.48049 1.53735C7.91519 1.06638 8.13254 0.8309 8.36348 0.693542C8.92074 0.36211 9.60698 0.351802 10.1736 0.666353C10.4084 0.796717 10.6324 1.02557 11.0804 1.48328C11.5285 1.94098 11.7525 2.16984 11.8801 2.40971C12.1881 2.98849 12.178 3.68946 11.8535 4.25874C11.7191 4.49468 11.4885 4.71671 11.0275 5.16075L5.54202 10.4442C4.66835 11.2857 4.2315 11.7065 3.68554 11.9197C3.13957 12.1329 2.53937 12.1172 1.33896 12.0859L1.17564 12.0816C0.810198 12.072 0.627475 12.0672 0.521262 11.9467C0.415042 11.8262 0.429544 11.64 0.458547 11.2678L0.474297 11.0657C0.555923 10.0179 0.596733 9.49404 0.801332 9.02312C1.00592 8.55219 1.35884 8.16988 2.06467 7.40513L7.48049 1.53735Z" stroke="#606060" strokeWidth="0.875" strokeLinejoin="round" />
                                                <path d="M6.85303 1.60435L10.9364 5.68769" stroke="#606060" strokeWidth="0.875" strokeLinejoin="round" />
                                                <path d="M7.43677 12.1042H12.1034" stroke="#606060" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>

                                        <span className="prefix">@</span>
                                        <input
                                            type="text"
                                            ref={usernameRef}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            readOnly={!isEditingUsername}
                                            onBlur={handleUsernameBlur}
                                            className={Styles.usernameInput}
                                        />
                                    </div>
                                    <div className={Styles.tagsSection} ref={tagsSectionRef}>
                                        {selectedTags.map((tag) => (
                                            <span key={tag} className={Styles.selectedTagPill}>
                                                {tag}
                                                <button
                                                    type="button"
                                                    className={Styles.removeTagBtn}
                                                    aria-label={`Remove ${tag}`}
                                                    onClick={() => handleTagRemove(tag)}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                        {selectedTags.length < 3 && (
                                            <div className={Styles.tagActionWrap}>
                                                <button
                                                    type="button"
                                                    className={Styles.addTagBtn}
                                                    onClick={() => setShowTagsDropdown((prev) => !prev)}
                                                >
                                                    {`+ Add up to ${remainingTagSlots} more ${remainingTagSlots === 1 ? "tag" : "tags"}`}
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





                                <div className={Styles.locationSection}>
                                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00391 8.5C5.00391 7.63805 5.34632 6.8114 5.95581 6.2019C6.5653 5.59241 7.39195 5.25 8.25391 5.25C9.11586 5.25 9.94251 5.59241 10.552 6.2019C11.1615 6.8114 11.5039 7.63805 11.5039 8.5C11.5039 9.36195 11.1615 10.1886 10.552 10.7981C9.94251 11.4076 9.11586 11.75 8.25391 11.75C7.39195 11.75 6.5653 11.4076 5.95581 10.7981C5.34632 10.1886 5.00391 9.36195 5.00391 8.5Z" fill="#ABB3FE" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.029201 7.377C0.195538 5.36675 1.11143 3.49247 2.59517 2.12598C4.07891 0.7595 6.02208 0.000656573 8.0392 0H8.4712C10.4883 0.000656573 12.4315 0.7595 13.9152 2.12598C15.399 3.49247 16.3149 5.36675 16.4812 7.377C16.6658 9.62141 15.9729 11.8499 14.5482 13.594L9.7552 19.456C9.57354 19.6783 9.34471 19.8575 9.08529 19.9806C8.82586 20.1036 8.54233 20.1675 8.2552 20.1675C7.96808 20.1675 7.68454 20.1036 7.42512 19.9806C7.16569 19.8575 6.93687 19.6783 6.7552 19.456L1.9632 13.594C0.538163 11.8501 -0.155102 9.62154 0.029201 7.377ZM8.2552 3.75C6.99542 3.75 5.78724 4.25045 4.89644 5.14124C4.00565 6.03204 3.5052 7.24022 3.5052 8.5C3.5052 9.75978 4.00565 10.968 4.89644 11.8588C5.78724 12.7496 6.99542 13.25 8.2552 13.25C9.51498 13.25 10.7232 12.7496 11.614 11.8588C12.5048 10.968 13.0052 9.75978 13.0052 8.5C13.0052 7.24022 12.5048 6.03204 11.614 5.14124C10.7232 4.25045 9.51498 3.75 8.2552 3.75Z" fill="#ABB3FE" />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Add your location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className={Styles.locationInput}
                                    />
                                </div>



                            </div>
                            {/* </div> */}


                            <div className={Styles.bioBox}>
                                <textarea
                                    name="bio"
                                    value={socials.bio}
                                    onChange={handleInputChange}
                                    placeholder="Add your bio here"
                                    spellCheck="false"
                                />
                            </div>

                            <div className={Styles.badgesSection}>
                                <h3 className={Styles.sectionTitle}>Your Badges</h3>
                                <div className={Styles.badgesList}>
                                    <div className={Styles.badgeCircle}></div>
                                    <div className={Styles.badgeCircle}></div>
                                    <div className={Styles.badgeCircle}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your Walls Section */}
                <div className={Styles.wallsWrapper}>
                    <h3 className={Styles.wallsTitle}>Your Walls</h3>
                    <div className={Styles.wallsEmptyState}>
                        <p className={Styles.emptyTitle}>This space is waiting to be personalized</p>
                        <p className={Styles.emptySubtitle}>Upload your favorite wallpapers and bring it to life</p>
                    </div>
                </div>

                <div className={Styles.footerWrapper}>
                    <Footer />
                </div>
            </div >
        </>
    );
};

export default Profile;