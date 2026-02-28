import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "../lib/api";

type FileType =
  | "image"
  | "pdf"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "archive"
  | "audio"
  | "video"
  | "url"
  | "text";

const TYPE_MESSAGES: Record<FileType, string> = {
  image: "Supports: .jpg, .jpeg, .png, .webp",
  pdf: "Supports: .pdf only",
  document: "Supports: .doc, .docx, .txt, .rtf",
  spreadsheet: "Supports: .xls, .xlsx, .csv",
  presentation: "Supports: .ppt, .pptx",
  archive: "Supports: .zip, .rar, .7z, .tar, .gz",
  audio: "Supports: .mp3, .wav, .ogg, .m4a",
  video: "Supports: .mp4, .avi, .mov, .wmv, .flv",
  url: "Enter a valid http:// or https:// link",
  text: "Enter text content",
};

const TYPE_EXTENSIONS: Record<FileType, string[]> = {
  image: [".jpg", ".jpeg", ".png", ".webp"],
  pdf: [".pdf"],
  document: [".doc", ".docx", ".txt", ".rtf"],
  spreadsheet: [".xls", ".xlsx", ".csv"],
  presentation: [".ppt", ".pptx"],
  archive: [".zip", ".rar", ".7z", ".tar", ".gz"],
  audio: [".mp3", ".wav", ".ogg", ".m4a"],
  video: [".mp4", ".avi", ".mov", ".wmv", ".flv"],
  url: [],
  text: [],
};

export default function UploadPage() {
  const location = useLocation();
  const initialType = (location.state?.type as FileType) || "pdf";
  const navigate = useNavigate();

  const [qrName, setQrName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [password, setPassword] = useState("");
  const [selfDestruct, setSelfDestruct] = useState(false);
  const [destructViews, setDestructViews] = useState(false);
  const [destructTime, setDestructTime] = useState(false);
  const [viewsValue, setViewsValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [type] = useState<FileType>(initialType);
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGenerateAndContinue = async () => {
    if (!qrName.trim()) {
      toast.error("Please enter a name for your QR code");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      if (type === "url") {
        if (!/^https?:\/\//.test(urlValue)) {
          toast.error("Please enter a valid http:// or https:// link");
          return;
        }
        formData.append("originalUrl", urlValue);
        formData.append("type", "URL");
      } else if (type === "text") {
        if (!textValue.trim()) {
          toast.error("Please enter some text content");
          return;
        }
        formData.append("textContent", textValue);
        formData.append("type", "TEXT");
      } else {
        if (!uploadedFile) {
          toast.error("Please select a file to upload");
          return;
        }
        formData.append("file", uploadedFile);
        formData.append("type", type.toUpperCase());
      }

      formData.append("name", qrName);

      if (passwordProtect && password.trim()) {
        formData.append("password", password);
      }

      if (selfDestruct && destructViews && viewsValue.trim()) {
        formData.append("viewLimit", viewsValue);
      }

      if (selfDestruct && destructTime && timeValue.trim()) {
        const hours = parseInt(timeValue);
        if (!isNaN(hours)) {
          const expirationTime = new Date();
          expirationTime.setHours(expirationTime.getHours() + hours);
          formData.append("expiresAt", expirationTime.toISOString());
        }
      }

      const response = await api.post("/api/zaps/upload", formData);
      navigate("/customize", { state: response.data.data });
    } catch (error: unknown) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const MAX_SIZE_MB = type === "video" ? 100 : 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const validateFileType = (file: File) => {
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    const allowed = TYPE_EXTENSIONS[type];
    return allowed.length === 0 || allowed.includes(ext);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`Max size allowed is ${MAX_SIZE_MB}MB`);
      return;
    }

    if (!validateFileType(file)) {
      toast.error(TYPE_MESSAGES[type]);
      return;
    }

    setUploadedFile(file);
    if (!qrName) setQrName(file.name);
  };

  const canGenerate =
    qrName.trim().length > 0 &&
    (type === "url"
      ? urlValue.trim().length > 0
      : type === "text"
        ? textValue.trim().length > 0
        : uploadedFile !== null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-card rounded-3xl shadow-lg p-8 space-y-8 border border-border">
          <Label>Name your QR Code</Label>
          <Input value={qrName} onChange={(e) => setQrName(e.target.value)} />

          {type === "url" && (
            <Input
              placeholder="https://example.com"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          )}

          {type === "text" && (
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full border p-4 rounded-lg"
            />
          )}

          {type !== "url" && type !== "text" && (
            <Input type="file" onChange={handleFileChange} />
          )}

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={passwordProtect}
                onCheckedChange={(checked) =>
                  setPasswordProtect(checked === true)
                }
              />
              <Label>Password Protection</Label>
            </div>

            {passwordProtect && (
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            )}

            <div className="flex items-center space-x-4">
              <Checkbox
                checked={selfDestruct}
                onCheckedChange={(checked) =>
                  setSelfDestruct(checked === true)
                }
              />
              <Label>Self Destruct</Label>
            </div>

            {selfDestruct && (
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={destructViews}
                    onCheckedChange={(checked) =>
                      setDestructViews(checked === true)
                    }
                  />
                  <Label>After Views</Label>
                </div>

                {destructViews && (
                  <Input
                    type="number"
                    value={viewsValue}
                    onChange={(e) => setViewsValue(e.target.value)}
                    placeholder="Number of views"
                  />
                )}

                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={destructTime}
                    onCheckedChange={(checked) =>
                      setDestructTime(checked === true)
                    }
                  />
                  <Label>After Time (hours)</Label>
                </div>

                {destructTime && (
                  <Input
                    type="number"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    placeholder="Hours"
                  />
                )}
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerateAndContinue}
            disabled={!canGenerate || loading}
          >
            {loading ? "Generating..." : "Generate QR Code"}
          </Button>
        </div>
      </main>
    </div>
  );
}