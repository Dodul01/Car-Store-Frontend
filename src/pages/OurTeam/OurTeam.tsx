import { Card, Typography, Row, Col, Avatar } from "antd";
import {
  MailOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    name: "Ayesha Rahman",
    role: "Lead Developer",
    image:
      "data:image/jpeg;base64,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",
    email: "ayesha@example.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Jahid Hasan",
    role: "UI/UX Designer",
    image:
      "data:image/jpeg;base64,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",
    email: "jahid@example.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Farzana Islam",
    role: "Backend Engineer",
    image:
      "data:image/jpeg;base64,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",
    email: "farzana@example.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Rifat Karim",
    role: "DevOps Engineer",
    image:
      "data:image/jpeg;base64,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",
    email: "rifat@example.com",
    linkedin: "#",
    github: "#",
  },
];

const OurTeam = () => {
  return (
    <div style={{ padding: "48px 24px", maxWidth: 1400, margin: "0 auto" }}>
      {/* Section 1: Intro */}
      <section style={{ marginBottom: "48px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#2c3d34" }}>
          Meet Our Team
        </Title>
        <Paragraph style={{ maxWidth: 600, margin: "auto", color: "#555" }}>
          Our talented team of engineers and designers is committed to
          delivering high-quality digital products with care, passion, and
          innovation.
        </Paragraph>
      </section>

      {/* Section 2: Team Members */}
      <section>
        <Row gutter={[24, 24]} justify="center">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  textAlign: "center",
                  padding: 16,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <Avatar
                  src={member.image}
                  size={96}
                  style={{ marginBottom: 16 }}
                />
                <Title level={4} style={{ marginBottom: 4 }}>
                  {member.name}
                </Title>
                <Text type="secondary">{member.role}</Text>
                <div style={{ marginTop: 12 }}>
                  <a
                    href={`mailto:${member.email}`}
                    style={{ margin: "0 8px", color: "#000" }}
                  >
                    <MailOutlined />
                  </a>
                  <a
                    href={member.linkedin}
                    style={{ margin: "0 8px", color: "#000" }}
                  >
                    <LinkedinOutlined />
                  </a>
                  <a
                    href={member.github}
                    style={{ margin: "0 8px", color: "#000" }}
                  >
                    <GithubOutlined />
                  </a>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Section 3: Culture & Values */}
      <section
        style={{
          marginTop: "96px",
          textAlign: "center",
          background: "#f5f5f5",
          borderRadius: 12,
          padding: "80px 24px",
        }}
      >
        <Title level={2} style={{ color: "#2c3d34", marginBottom: "24px" }}>
          Our Culture & Core Values
        </Title>
        <Paragraph
          style={{
            maxWidth: 900,
            margin: "auto",
            fontSize: 16,
            lineHeight: 1.8,
            color: "#555",
          }}
        >
          At our company, culture isn’t just a buzzword—it’s the heartbeat of
          everything we do. We foster a positive and collaborative environment
          where innovation thrives, diversity is celebrated, and every voice
          matters. We believe that success is built on trust, transparency, and
          continuous growth, both as a team and as individuals.
        </Paragraph>

        <Row gutter={[32, 32]} justify="center" style={{ marginTop: "48px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                🌱 Growth
              </Title>
              <Paragraph style={{ color: "#555" }}>
                We invest in personal and professional development so our team
                can keep evolving with the industry.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                🤝 Collaboration
              </Title>
              <Paragraph style={{ color: "#555" }}>
                Open communication and teamwork fuel our ability to build
                meaningful, scalable solutions.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                🎯 Ownership
              </Title>
              <Paragraph style={{ color: "#555" }}>
                We take pride in our work and take responsibility from ideation
                to execution.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                💡 Innovation
              </Title>
              <Paragraph style={{ color: "#555" }}>
                We embrace challenges and continuously experiment to push the
                boundaries of what’s possible.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Section 4: Join Us */}
      <section
        style={{
          marginTop: "96px",
          padding: "80px 24px",
          backgroundColor: "#fffbe6",
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <Title level={2} style={{ color: "#2c3d34", marginBottom: "24px" }}>
          Join Our Mission
        </Title>
        <Paragraph
          style={{
            maxWidth: 800,
            margin: "auto",
            fontSize: 16,
            lineHeight: 1.8,
            color: "#555",
          }}
        >
          We’re building more than just a company — we’re building a culture of
          innovation, inclusivity, and purpose. If you’re passionate about
          making an impact, growing your skills, and working with a team that
          values your contributions, we’d love to hear from you.
        </Paragraph>

        <Row gutter={[32, 32]} justify="center" style={{ marginTop: "48px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                🌍 Global Team
              </Title>
              <Paragraph style={{ color: "#555" }}>
                Work with diverse talents across countries, united by one
                vision.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                📈 Career Growth
              </Title>
              <Paragraph style={{ color: "#555" }}>
                We support continuous learning and internal mobility to help
                thrive.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                💼 Open Roles
              </Title>
              <Paragraph style={{ color: "#555" }}>
                From engineering to marketing—explore roles where you can shine.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{ background: "#fff", borderRadius: 12, padding: 24 }}
            >
              <Title level={4} style={{ color: "#2c3d34" }}>
                ❤️ People-First
              </Title>
              <Paragraph style={{ color: "#555" }}>
                Enjoy flexible hours, mental health days, and a truly
                collaborative vibe.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "48px" }}>
          {/* <a
            href="/careers"
            style={{
              display: "inline-block",
              backgroundColor: "#2c3d34",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "16px",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1f2b25")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c3d34")
            }
          >
            View Open Positions →
          </a> */}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
