import type { ExportFormat } from "../../lib/qr-export";
import {
    FORMAT_INFO,
    estimateFileSize,
} from "../../lib/qr-export";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { HardDrive, SlidersHorizontal } from "lucide-react";

interface ExportPreviewProps {
    format: ExportFormat;
    resolution: number;
    quality: number;
    onQualityChange: (quality: number) => void;
}

export default function ExportPreview({
    format,
    resolution,
    quality,
    onQualityChange,
}: ExportPreviewProps) {
    const info = FORMAT_INFO[format];
    const sizeEstimate = estimateFileSize(format, resolution, quality);
    const isLossy = info.lossy;

    return (
        <div className="space-y-4">
            {/* Quality Slider — only for lossy formats */}
            {isLossy && (
                <div className="space-y-3">
                    <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <SlidersHorizontal className="h-4 w-4" />
                        Quality
                    </Label>
                    <div className="flex items-center gap-4">
                        <Slider
                            min={10}
                            max={100}
                            step={5}
                            value={quality}
                            onChange={(e) => onQualityChange(Number(e.target.value))}
                            className="flex-1"
                        />
                        <span className="text-sm font-mono font-semibold text-primary w-12 text-right">
                            {quality}%
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {quality >= 80
                            ? "High quality — larger file"
                            : quality >= 50
                                ? "Balanced quality and size"
                                : "Small file — lower quality"}
                    </p>
                </div>
            )}

            {/* File Size Preview */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <HardDrive className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            Estimated File Size
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {info.label} • {format === "svg" || format === "pdf" ? "Vector" : `${resolution}px`}
                        </p>
                    </div>
                </div>
                <span className="text-lg font-bold text-primary">{sizeEstimate}</span>
            </div>
        </div>
    );
}
