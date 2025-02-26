// /Image import '/assets/add-team.svg' from '../../../assets/add-team.svwidth={30} height={30}g'
// import share from "../../../assets/share-08.svg";
import Button from "../../../components/Button";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import HostsCard from "../../../components/HostsCard";
import VisibilityCard from "../../../components/VisibilityCard";
import Image from "next/image";

function DashboardPage() {
    return (
        <>
            <div className="flex flex-col gap-y-4 text-white w-[70%] ml-20">
                <div>
                    <h1 className="text-3xl">
                        Workshop: Leveraging The Graph to build Your Dapp
                    </h1>
                </div>
                <div className="flex space-x-5 mt-12">
                    <Button bgColor="#1E1D1D">
                        <span>Invite Participants</span>
                        <Image src={'/assets/add-team.svg'} alt="" className="ml-2 inline" width={30} height={30}/>
                    </Button>
                    <Button bgColor="#1E1D1D">
                        <span>Share Event</span>
                        <Image src={'/assets/share-08.svg'} alt="" className="ml-2 inline" width={30} height={30}/>
                    </Button>
                </div>
                <EventCard />
                <VisibilityCard />
                <HostsCard />
                <Footer />
            </div>
            <hr className="absolute w-[100%] top-48 left-0" />
            <hr className="absolute w-[95%] bottom-52 left-10" />
        </>
    );
}

export default DashboardPage;
