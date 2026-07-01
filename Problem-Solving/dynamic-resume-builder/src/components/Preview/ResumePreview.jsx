const SectionHeader = ({ children }) => (
  <div className="flex items-center gap-2 mb-3">
    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563eb]">{children}</h3>
    <div className="flex-1 h-px bg-[#2563eb]/30" />
  </div>
);

const EmptyState = ({ label }) => (
  <p className="text-[10px] text-gray-400 italic">No {label} added yet</p>
);

function PersonalSection({ data }) {
  return (
    <div className="text-center mb-5 pb-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 leading-tight">
        {data.name || <span className="text-gray-300">Your Name</span>}
      </h1>
      {data.title && (
        <p className="text-sm text-[#2563eb] font-medium mt-0.5">{data.title}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 mt-2">
        {data.email && <span className="text-[10px] text-gray-500">{data.email}</span>}
        {data.phone && <><span className="text-gray-300">·</span><span className="text-[10px] text-gray-500">{data.phone}</span></>}
        {data.location && <><span className="text-gray-300">·</span><span className="text-[10px] text-gray-500">{data.location}</span></>}
        {data.linkedin && <><span className="text-gray-300">·</span><span className="text-[10px] text-[#2563eb]">{data.linkedin}</span></>}
      </div>
      {data.summary && (
        <p className="text-[10px] text-gray-600 mt-2 max-w-lg mx-auto leading-relaxed">{data.summary}</p>
      )}
    </div>
  );
}

function ExperienceSection({ data }) {
  if (!data.length) return <EmptyState label="experience" />;
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.id}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900">{item.role || "Job Title"}</p>
              <p className="text-[10px] text-gray-600">{item.company}{item.location ? ` · ${item.location}` : ""}</p>
            </div>
            {(item.startDate || item.endDate) && (
              <p className="text-[10px] text-gray-400 whitespace-nowrap ml-2 mt-0.5">
                {item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}
              </p>
            )}
          </div>
          {item.bullets?.filter(Boolean).length > 0 && (
            <ul className="mt-1 space-y-0.5 ml-3">
              {item.bullets.filter(Boolean).map((b, i) => (
                <li key={i} className="text-[10px] text-gray-600 leading-relaxed list-disc list-outside ml-2">{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ data }) {
  if (!data.length) return <EmptyState label="education" />;
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.id} className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-gray-900">{item.institution || "Institution"}</p>
            <p className="text-[10px] text-gray-600">
              {[item.degree, item.field].filter(Boolean).join(", ")}
              {item.gpa ? ` · GPA: ${item.gpa}` : ""}
            </p>
            {item.description && (
              <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
            )}
          </div>
          {(item.startYear || item.endYear) && (
            <p className="text-[10px] text-gray-400 whitespace-nowrap ml-2 mt-0.5">
              {item.startYear}{item.endYear ? ` – ${item.endYear}` : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ data }) {
  if (!data.length) return <EmptyState label="skills" />;
  return (
    <div className="space-y-1.5">
      {data.map((group) => (
        <div key={group.id} className="flex gap-2">
          {group.category && (
            <span className="text-[10px] font-bold text-gray-700 whitespace-nowrap min-w-[70px]">{group.category}:</span>
          )}
          <p className="text-[10px] text-gray-600">
            {(group.items || []).map((s) => s.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ data }) {
  if (!data.length) return <EmptyState label="projects" />;
  return (
    <div className="space-y-2.5">
      {data.map((item) => (
        <div key={item.id}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-gray-900">{item.name || "Project Name"}</p>
              {item.liveUrl && (
                <span className="text-[9px] text-[#2563eb]">{item.liveUrl}</span>
              )}
            </div>
            {item.date && <p className="text-[10px] text-gray-400 ml-2 mt-0.5">{item.date}</p>}
          </div>
          {item.tech?.length > 0 && (
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">{item.tech.join(", ")}</p>
          )}
          {item.description && (
            <p className="text-[10px] text-gray-600 mt-0.5 leading-relaxed">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const SECTION_RENDERERS = {
  personal: null, // rendered separately always first
  experience: (resume) => (
    <>
      <SectionHeader>Work Experience</SectionHeader>
      <ExperienceSection data={resume.experience} />
    </>
  ),
  education: (resume) => (
    <>
      <SectionHeader>Education</SectionHeader>
      <EducationSection data={resume.education} />
    </>
  ),
  skills: (resume) => (
    <>
      <SectionHeader>Skills</SectionHeader>
      <SkillsSection data={resume.skills} />
    </>
  ),
  projects: (resume) => (
    <>
      <SectionHeader>Projects</SectionHeader>
      <ProjectsSection data={resume.projects} />
    </>
  ),
};

export default function ResumePreview({ resume }) {
  return (
    <div
      id="resume-preview"
      className="bg-white text-gray-900 w-full min-h-full p-8 font-['Georgia',serif] text-[11px] leading-normal shadow-inner"
      style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
    >
      <PersonalSection data={resume.personal} />
      <div className="space-y-4">
        {resume.sectionOrder
          .filter((s) => s !== "personal" && SECTION_RENDERERS[s])
          .map((sec) => (
            <section key={sec}>{SECTION_RENDERERS[sec](resume)}</section>
          ))}
      </div>
    </div>
  );
}