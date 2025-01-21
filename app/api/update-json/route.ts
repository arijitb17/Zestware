import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const jsonFileMap: Record<string, string> = {
  brah_hoodie: "public/brah/hoodie.json",
  brah_tshirt: "public/brah/Tshirt.json",
  nirbh_hoodie: "public/nirbh/hoodie.json",
  nirbh_tshirt: "public/nirbh/Tshirt.json",
  custom_tshirt: "public/custom/tshirts.json",
  jersey: "public/jersey/jersey.json",
  uniforms: "public/uniforms/schools.json",
};

export async function POST(req: NextRequest) {
  const { fileKey, data } = await req.json();

  if (!fileKey || !jsonFileMap[fileKey]) {
    return NextResponse.json({ error: "Invalid fileKey" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), jsonFileMap[fileKey]);

  try {
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (Array.isArray(existingData)) {
      existingData.push(data);
    } else {
      // Custom handling for nested structures (e.g., uniforms)
      if (fileKey === "uniforms") {
        if (data.district && data.school) {
          const district = existingData.districts[data.district];
          if (district) {
            const school = district.find((s: any) => s.name === data.school);
            if (school) {
              school.uniforms.push(data.uniform);
            }
          }
        }
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    return NextResponse.json({ message: "Data added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update JSON." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { fileKey, id } = await req.json();

  if (!fileKey || !jsonFileMap[fileKey]) {
    return NextResponse.json({ error: "Invalid fileKey" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), jsonFileMap[fileKey]);

  try {
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (Array.isArray(existingData)) {
      const updatedData = existingData.filter((item: any) => item.id !== id);
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    } else if (fileKey === "uniforms") {
      // Custom handling for nested structures
      Object.keys(existingData.districts).forEach((district) => {
        existingData.districts[district] = existingData.districts[district].map((school: any) => {
          school.uniforms = school.uniforms.filter((uniform: any) => uniform.id !== id);
          return school;
        });
      });

      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    }

    return NextResponse.json({ message: "Data deleted successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete JSON." }, { status: 500 });
  }
}
