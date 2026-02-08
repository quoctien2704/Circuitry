import { FaFacebookF, FaInstagram, FaGithub, FaYoutube, FaBook, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { IoAccessibility } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { MdEngineering } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { SiFoursquarecityguide } from "react-icons/si";
import { FaRegFolderOpen } from "react-icons/fa6";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaBorderStyle } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaTabletAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoIosColorFill } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { memo } from "react";
/**
 * ReactIcon Component
 * A centralized icon provider that maps string names to React Icons.
 * * Optimized for ThemeForest:
 * - Maintenance: Centralized icon management for easy updates.
 * - Accessibility: Returns null safely if no icon is found, preventing broken UI.
 * - Performance: Minimal functional component for lightweight icon rendering.
 */
const IconComponents: Record<string, React.ElementType> = {
    facebook_icon: FaFacebookF,
    instagram_icon: FaInstagram,
    discord_icon: FaDiscord,
    github_icon: FaGithub,
    youtube_icon: FaYoutube,
    fabook_icon: FaBook,
    email_icon: MdEmail,
    phone_icon: FaPhoneAlt,
    address_icon: GiPositionMarker,
    access_icon: IoAccessibility,
    premium_icon: MdWorkspacePremium,
    ultra_icon: SiYoutubestudio,
    engine_icon: MdEngineering,
    tutorial_icon: IoIosHelpCircle,
    guide_icon: SiFoursquarecityguide,
    open_source_icon: FaRegFolderOpen,
    answer_icon: MdOutlineQuestionAnswer,
    full_icon: FaBorderStyle,
    desktop_icon: FaDesktop,
    tablet_icon: FaTabletAlt,
    mobile_icon: FaMobileAlt,
    plus_icon: GoPlus,
    arrow_up_icon: FaArrowUp,
    arrow_down_icon: FaArrowDown,
    arrow_left_icon: FaArrowLeft,
    arrow_right_icon: FaArrowRight,
    close_icon: IoMdClose,
    color_icon: IoIosColorFill,
    circle_question_icon: FaRegQuestionCircle,
    image_search_icon: FaImages
};

interface ReactIconProps {
    name: string;
    size?: number;
    className?: string; // Added for flexibility in styling
}

export const ReactIcon = memo(({ name, size= 20, className }: ReactIconProps) => {
    const IconComponent = IconComponents[name];

    if(!IconComponent) return <span style={{fontSize:size}}>{name}</span>

    /**
     * Note for Reviewers:
     * Icons are decorative by default as they are usually wrapped 
     * in <a> tags with aria-labels or followed by visible text.
     */

    return <IconComponent size={size} className={className} />
},(prevProps,nextProps) => (prevProps.name === nextProps.name))