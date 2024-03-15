import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import Tabs from "../Login/Tabs";
import { useState ,useEffect, useContext } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { authContext } from "../../context/context";


export default function Tab() {
const {auth} = useContext(authContext);
const navigate = useNavigate();
useEffect(()=>{
  if(auth){
    navigate('/user');
    // console.log(auth)
    return;
  }
},[]);

  const [activeTab, setActiveTab] = useState<string>('tab2');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  }
 
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Login />;
      case 'tab2':
        return <SignUp />;
      default:
        return <SignUp />;
    }
  };

  const tabs = [
    { id: 'tab1', label: 'Login' },
    { id: 'tab2', label: 'Signup' },
  ];

  return (
    <div className="flex flex-col items-center w-full ">
      <Tabs tabs={tabs} onTabChange={handleTabChange} />
      <div className="">{renderContent()}</div>
    </div>
  
  );
}
