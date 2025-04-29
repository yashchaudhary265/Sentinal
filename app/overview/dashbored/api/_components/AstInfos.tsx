"use client";

import { Input } from "@/components/ui/input";
import { useAstContext } from "@/context/AstContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const AstInfos = (props: Props) => {
  const { astInfo } = useAstContext();

  const [showApiToken, setShowApiToken] = useState(false); 

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Assignment Name */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Assignment Name</p>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Assignment Name"
            value={astInfo?.astName}
            readOnly
          />
        </div>
      </div>

      {/* Assignment ID with Eye Icon for visibility toggle */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Assignment ID</p>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Assignment ID"
            value={!showApiToken ? (astInfo?.api_token ? "****************************************" : "") : astInfo?.api_token}
            readOnly
          />
          <button
            className="p-[7px] border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => setShowApiToken(!showApiToken)}
            aria-label="Toggle API Token Visibility"
          >
            {!showApiToken ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstInfos;