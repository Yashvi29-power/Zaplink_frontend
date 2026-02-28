import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, Zap } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { uploadZap } from "../services/api";
import FileUpload from "./FileUpload";

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

export default function UploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialType = (location.state?.type as FileType) || "pdf";

  const [qrName, setQrName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [password, setPassword] = useState("");
  const [selfDestruct, setSelfDestruct] = useState(false);
  const [viewsValue, setViewsValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const hasContent =
    (initialType === "url" && urlValue.trim()) ||
    (initialType === "text" && textValue.trim()) ||
    (initialType !== "url" &&
      initialType !== "text" &&
      uploadedFile);

  const hasValidName = qrName.trim().length > 0;
  const canGenerate = hasContent && hasValidName;

  const handleGenerateAndContinue = async () => {
    if (!canGenerate) {
      toast.error("Please complete required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      if (initialType === "url") {
        formData.append("originalUrl", urlValue);
        formData.append("type", "URL");
      } else if (initialType === "text") {
        formData.append("textContent", textValue);
        formData.append("type", "TEXT");
      } else {
        if (!uploadedFile) {
          toast.error("Select file");
          return;
        }
        formData.append("file", uploadedFile);
        formData.append("type", initialType.toUpperCase());
      }

      formData.append("name", qrName);

      if (passwordProtect && password.trim()) {
        formData.append("password", password);
      }

      if (selfDestruct && viewsValue) {
        formData.append("viewLimit", viewsValue);
      }

      if (selfDestruct && timeValue) {
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + Number(timeValue));
        formData.append("expiresAt", expiration.toISOString());
      }

      abortControllerRef.current = new AbortController();

      const data = await uploadZap(formData);

      toast.success("QR Code Generated!");

      navigate("/customize", {
        state: {
          zapId: data.zapId,
          shortUrl: data.shortUrl,
          qrCode: data.qrCode,
          type: data.type,
          name: data.name,
          deletionToken: data.deletionToken,
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-card rounded-3xl shadow-lg p-8 space-y-8 border border-border">

          <Label>Name your QR Code</Label>
          <Input
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
          />

          {initialType === "url" && (
            <Input
              placeholder="https://example.com"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          )}

          {initialType === "text" && (
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full border p-4 rounded-lg"
            />
          )}

          {initialType !== "url" && initialType !== "text" && (
            <FileUpload
              maxFiles={1}
              onUpload={(files) => setUploadedFile(files[0])}
              onError={(err) => toast.error(err)}
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={passwordProtect}
                onCheckedChange={(c) => setPasswordProtect(c === true)}
              />
              <Label>Password Protection</Label>
            </div>

            {passwordProtect && (
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <div className="flex items-center gap-4">
              <Checkbox
                checked={selfDestruct}
                onCheckedChange={(c) => setSelfDestruct(c === true)}
              />
              <Label>Self Destruct</Label>
            </div>

            {selfDestruct && (
              <>
                <Input
                  type="number"
                  placeholder="After Views"
                  value={viewsValue}
                  onChange={(e) => setViewsValue(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="After Hours"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                />
              </>
            )}
          </div>

          <Button
            onClick={handleGenerateAndContinue}
            disabled={!canGenerate || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="mr-2" />
                Generate QR Code
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}