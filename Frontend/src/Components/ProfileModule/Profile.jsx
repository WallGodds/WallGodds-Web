import { useEffect, useRef, useState } from "react";
import Footer from "../CommonModule/FooterModule/Footer";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Styles from "./Profile.module.css";

const Profile = () => {
    const fileInputRef = useRef(null);
    const [name, setName] = useState("Samuel Khanna");
    const [username, setUsername] = useState("sam96");
    const [location, setLocation] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [showTagsDropdown, setShowTagsDropdown] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [preview, setPreview] = useState(null);

    const availableTags = [
        "Developer",
        "Artist",
        "Caz",
        "Illustrator",
        "Designer",
        "Minimalist",
        "Photographer"
    ];

    const handleTagToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
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
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            alert("Please select an image smaller than 5MB.");
            e.target.value = "";
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreview((prevPreview) => {
            if (prevPreview && prevPreview.startsWith("blob:")) {
                URL.revokeObjectURL(prevPreview);
            }
            return imageUrl;
        });

        // Allow selecting the same file again.
        e.target.value = "";
    };

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    return (
        <>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>
            <div className={Styles.container}>
                <div className={Styles.profileCard}>
                    <div className={Styles.profileHeader}>
                        <div className={Styles.profilePhotoSection}>
                            <div className={Styles.profilePhoto}>
                                <img
                                    src={preview || "/api/placeholder/150/150"}
                                    alt={`${name} profile`}
                                />
                            </div>
                            <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    hidden
                                />
                            <button
                                type="button"
                                onClick={handleImageClick}
                                className={Styles.editPhotoBtn}
                            >
                                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6375 5.7375V10.8375C17.6375 13.2417 17.6375 14.4437 16.8906 15.1906C16.1437 15.9375 14.9416 15.9375 12.5375 15.9375H5.73745C3.33329 15.9375 2.13121 15.9375 1.38433 15.1906C0.637451 14.4437 0.637451 13.2417 0.637451 10.8375V7.48313C0.637451 6.65007 0.637451 6.23353 0.73386 5.89295C0.975033 5.04096 1.64092 4.37508 2.49291 4.1339C2.83349 4.0375 3.25002 4.0375 4.08309 4.0375C4.39417 4.0375 4.54971 4.0375 4.69459 4.01224C5.05358 3.94966 5.38296 3.77338 5.63416 3.5094C5.73555 3.40285 5.98989 3.02133 6.16245 2.7625C6.49937 2.25712 6.66783 2.00443 6.89812 1.83061C7.03875 1.72447 7.19503 1.64083 7.36136 1.58269C7.63373 1.4875 7.93743 1.4875 8.54481 1.4875H9.98745" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.5375 9.5625C12.5375 11.4403 11.0153 12.9625 9.13755 12.9625C7.25978 12.9625 5.73755 11.4403 5.73755 9.5625C5.73755 7.68473 7.25978 6.1625 9.13755 6.1625C11.0153 6.1625 12.5375 7.68473 12.5375 9.5625Z" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.5374 2.7625H16.7874M14.6624 4.8875V0.637497" stroke="#8EA3E6" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </button>
                        </div>

                        <div className={Styles.profileInfo}>
                            <div className={Styles.nameSection}>
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
                                    className={Styles.editBtn}
                                    onClick={() => setIsEditingName(!isEditingName)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.4018 2.0607L13.2681 1.19446C13.9857 0.476847 15.1492 0.476847 15.8668 1.19446C16.5844 1.91208 16.5844 3.07556 15.8668 3.79318L15.0006 4.65943M12.4018 2.0607L6.57491 7.8876C6.13084 8.33175 5.81581 8.88807 5.6635 9.49734L5.03003 12.0312L7.56394 11.3977C8.1732 11.2455 8.72953 10.9304 9.17368 10.4863L15.0006 4.65943M12.4018 2.0607L15.0006 4.65943" stroke="#3C56B1" strokeWidth="1.3125" strokeLinejoin="round"/>
                                        <path d="M14.6562 9.84344C14.6562 12.72 14.6562 14.1582 13.8617 15.1263C13.7163 15.3035 13.5538 15.466 13.3766 15.6114C12.4086 16.4059 10.9702 16.4059 8.09366 16.4059H7.65625C4.35642 16.4059 2.70651 16.4059 1.68139 15.3808C0.656276 14.3557 0.65625 12.7057 0.65625 9.40594V8.96844C0.65625 6.0919 0.65625 4.65364 1.4507 3.68558C1.59615 3.50836 1.75866 3.34584 1.93589 3.20039C2.90394 2.40594 4.3422 2.40594 7.21875 2.40594" stroke="#3C56B1" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>


                                </button>
                                <button className={Styles.shareBtn} onClick={handleShare}>
                                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.75 1.75H6.75C3.92157 1.75 2.50736 1.75 1.62868 2.62868C0.75 3.50736 0.75 4.92157 0.75 7.75V11.75C0.75 14.5784 0.75 15.9926 1.62868 16.8713C2.50736 17.75 3.92157 17.75 6.75 17.75H10.7884C13.6168 17.75 15.031 17.75 15.9097 16.8713C16.479 16.302 16.6794 15.5079 16.75 14.25" stroke="#3C56B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14.2498 4.25V1.10355C14.2498 0.908291 14.408 0.75 14.6033 0.75C14.6971 0.75 14.787 0.787249 14.8533 0.853553L19.3962 5.39645C19.6226 5.62282 19.7498 5.92986 19.7498 6.25C19.7498 6.57014 19.6226 6.87718 19.3962 7.10355L14.8533 11.6464C14.787 11.7128 14.6971 11.75 14.6033 11.75C14.408 11.75 14.2498 11.5917 14.2498 11.3964V8.25H11.3208C7.24976 8.25 5.74976 11.75 5.74976 11.75V9.25C5.74976 6.48858 7.98833 4.25 10.7498 4.25H14.2498Z" fill="#3C56B1" stroke="#3C56B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                </button>
                            </div>

                            <div className={Styles.usernameSection} >
                                <div className={Styles.usernameTab}>

                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.48049 1.53735C7.91519 1.06638 8.13254 0.8309 8.36348 0.693542C8.92074 0.36211 9.60698 0.351802 10.1736 0.666353C10.4084 0.796717 10.6324 1.02557 11.0804 1.48328C11.5285 1.94098 11.7525 2.16984 11.8801 2.40971C12.1881 2.98849 12.178 3.68946 11.8535 4.25874C11.7191 4.49468 11.4885 4.71671 11.0275 5.16075L5.54202 10.4442C4.66835 11.2857 4.2315 11.7065 3.68554 11.9197C3.13957 12.1329 2.53937 12.1172 1.33896 12.0859L1.17564 12.0816C0.810198 12.072 0.627475 12.0672 0.521262 11.9467C0.415042 11.8262 0.429544 11.64 0.458547 11.2678L0.474297 11.0657C0.555923 10.0179 0.596733 9.49404 0.801332 9.02312C1.00592 8.55219 1.35884 8.16988 2.06467 7.40513L7.48049 1.53735Z" stroke="#606060" strokeWidth="0.875" strokeLinejoin="round"/>
                                    <path d="M6.85303 1.60435L10.9364 5.68769" stroke="#606060" strokeWidth="0.875" strokeLinejoin="round"/>
                                    <path d="M7.43677 12.1042H12.1034" stroke="#606060" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="prefix">@</span>
                                {isEditingUsername ? (
                              < div>      
                                    <input
                                        type="text"
                                        value={username}
                                        
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => setIsEditingUsername(false)}
                                        className={Styles.usernameInput}
                                        autoFocus
                                    />
                                    </div>
                                ) : (
                                    <span 
                                        className={Styles.username}
                                        onClick={() => setIsEditingUsername(true)}
                                    >
                                        {username}
                                    </span>
                                )}
                                </div>

                                 <div className={Styles.tagsSection}>
                                <button 
                                    className={Styles.addTagBtn}
                                    onMouseEnter={() => setShowTagsDropdown(true)}
                                    onMouseLeave={() => setShowTagsDropdown(false)}
                                >
                                    + Add upto 3 more tag
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
                                </button>
                            </div>
                            </div>

                           

                            <div className={Styles.locationSection}>
                                <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.00391 8.5C5.00391 7.63805 5.34632 6.8114 5.95581 6.2019C6.5653 5.59241 7.39195 5.25 8.25391 5.25C9.11586 5.25 9.94251 5.59241 10.552 6.2019C11.1615 6.8114 11.5039 7.63805 11.5039 8.5C11.5039 9.36195 11.1615 10.1886 10.552 10.7981C9.94251 11.4076 9.11586 11.75 8.25391 11.75C7.39195 11.75 6.5653 11.4076 5.95581 10.7981C5.34632 10.1886 5.00391 9.36195 5.00391 8.5Z" fill="#ABB3FE"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.029201 7.377C0.195538 5.36675 1.11143 3.49247 2.59517 2.12598C4.07891 0.7595 6.02208 0.000656573 8.0392 0H8.4712C10.4883 0.000656573 12.4315 0.7595 13.9152 2.12598C15.399 3.49247 16.3149 5.36675 16.4812 7.377C16.6658 9.62141 15.9729 11.8499 14.5482 13.594L9.7552 19.456C9.57354 19.6783 9.34471 19.8575 9.08529 19.9806C8.82586 20.1036 8.54233 20.1675 8.2552 20.1675C7.96808 20.1675 7.68454 20.1036 7.42512 19.9806C7.16569 19.8575 6.93687 19.6783 6.7552 19.456L1.9632 13.594C0.538163 11.8501 -0.155102 9.62154 0.029201 7.377ZM8.2552 3.75C6.99542 3.75 5.78724 4.25045 4.89644 5.14124C4.00565 6.03204 3.5052 7.24022 3.5052 8.5C3.5052 9.75978 4.00565 10.968 4.89644 11.8588C5.78724 12.7496 6.99542 13.25 8.2552 13.25C9.51498 13.25 10.7232 12.7496 11.614 11.8588C12.5048 10.968 13.0052 9.75978 13.0052 8.5C13.0052 7.24022 12.5048 6.03204 11.614 5.14124C10.7232 4.25045 9.51498 3.75 8.2552 3.75Z" fill="#ABB3FE"/>
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
                    </div>

                    <div className={Styles.gallerySection}>
                        <div className={Styles.galleryPlaceholder}>
                            {/* Gallery content will go here */}
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
