import { useContext, useState } from "react";
import AppContext from "@/components/AppContext";
import { Button, Row } from "antd";
import { useRouter } from "next/router";
import { calculateTime } from "@/components/CalculateTime";
import { BrowserView, MobileView } from "react-device-detect";

export default function Page2() {
  const [ipAddress, setIpAddress] = useState(null);
  const context = useContext(AppContext);
  const router = useRouter();

  const startTime = context.store?.pageStart;
  const endTime = context.store?.pageEndSession;
  const timeDifference = calculateTime(startTime, endTime);

  const timeSpendInputs = calculateTime(
    context.store?.startTime,
    context.store?.endTime
  );

  const getIpAddress = async () => {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    return data.ip;
  };

  getIpAddress().then((ip) => {
    setIpAddress(ip);
  });

  const moveToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="login-warp">
        <Row>
          <h2>Collected data:</h2>
          <Button onClick={moveToLogin} style={{ width: "50%" }}>
            To Login
          </Button>
        </Row>
        <br></br>
        <h4>Login</h4>
        <p>
          Total time spent on page:
          {timeDifference.minutes} minutes and {timeDifference.seconds} seconds
        </p>
        <p>
          Time spent between first input and last input:
          {timeSpendInputs.minutes} minutes and {timeSpendInputs.seconds}{" "}
          seconds
        </p>
        <p>
          Number of changes (edits) made to the input: number of characters
          &nbsp;&nbsp;{context.store?.numChanges}&nbsp;&nbsp; and retries
          &nbsp;&nbsp; {context.store?.numRetries}
        </p>
        <br></br>
        <h4>Question page 1:</h4>
        <p>{context.store?.values.age}</p>
        <br></br>
        <h4>Question page 2:</h4>
        <p>{context.store?.value}</p>

        <br></br>
        <h4>device model</h4>
        <BrowserView>
          <p>This is rendered only on desktop browsers.</p>
        </BrowserView>
        <MobileView>
          <p>This is rendered only on mobile devices.</p>
        </MobileView>
        <br></br>
        <h4>IP address</h4>
        {ipAddress ? <p>{ipAddress}</p> : <p>Loading...</p>}
      </div>
    </>
  );
}
