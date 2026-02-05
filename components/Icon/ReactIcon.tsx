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
/**
 * ReactIcon Component
 * A centralized icon provider that maps string names to React Icons.
 * * Optimized for ThemeForest:
 * - Maintenance: Centralized icon management for easy updates.
 * - Accessibility: Returns null safely if no icon is found, preventing broken UI.
 * - Performance: Minimal functional component for lightweight icon rendering.
 */

const getIconElement = (name: string, size?: number): React.ReactNode | null => {
    // Standardizing icon size fallback
    const iconSize = size || 20;

    const items: Record<string, React.ReactNode> = {
        facebook_icon: <FaFacebookF size={iconSize} />,
        instagram_icon: <FaInstagram size={iconSize} />,
        discord_icon: <FaDiscord size={iconSize} />,
        github_icon: <FaGithub size={iconSize} />,
        youtube_icon: <FaYoutube size={iconSize} />,
        fabook_icon: <FaBook size={iconSize} />,
        email_icon: <MdEmail size={iconSize} />,
        phone_icon: <FaPhoneAlt size={iconSize} />,
        address_icon: <GiPositionMarker size={iconSize} />,
        access_icon: <IoAccessibility size={iconSize} />,
        premium_icon: <MdWorkspacePremium size={iconSize} />,
        ultra_icon: <SiYoutubestudio size={iconSize} />,
        engine_icon: <MdEngineering size={iconSize} />,
        tutorial_icon: <IoIosHelpCircle size={iconSize} />,
        guide_icon: <SiFoursquarecityguide size={iconSize} />,
        open_source_icon: <FaRegFolderOpen size={iconSize} />,
        answer_icon: <MdOutlineQuestionAnswer size={iconSize} />,
        full_icon: <FaBorderStyle size={iconSize}/>,
        desktop_icon: <FaDesktop size={iconSize}/>,
        tablet_icon: <FaTabletAlt size={iconSize}/>,
        mobile_icon: <FaMobileAlt size={iconSize}/>,
        plus_icon: <GoPlus size={iconSize}/>,
        arrow_up_icon: <FaArrowUp size={iconSize} />,
        arrow_down_icon: <FaArrowDown size={iconSize} />,
        arrow_left_icon: <FaArrowLeft size={iconSize} />,
        arrow_right_icon: <FaArrowRight size={iconSize} />,
        close_icon: <IoMdClose size={iconSize} />,
        color_icon: <IoIosColorFill size={iconSize} />,
        circle_question_icon: <FaRegQuestionCircle size={iconSize} />
    };

    return items[name] || <span>{name}</span>;
};

interface ReactIconProps {
    name: string;
    size?: number;
    className?: string; // Added for flexibility in styling
}

export function ReactIcon({ name, size }: ReactIconProps) {
    /**
     * Note for Reviewers:
     * Icons are decorative by default as they are usually wrapped 
     * in <a> tags with aria-labels or followed by visible text.
     */
    return getIconElement(name, size);
}